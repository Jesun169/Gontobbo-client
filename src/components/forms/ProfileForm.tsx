"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const profileSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    initialData?: Partial<ProfileFormData>;
    onSubmit?: (data: ProfileFormData) => Promise<void>;
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: initialData,
    });

    const onFormSubmit = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            if (onSubmit) {
                await onSubmit(data);
            }
            toast({
                title: "Profile updated",
                description: "Your profile has been successfully updated.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">First Name</label>
                            <Input
                                {...register("firstName")}
                                placeholder="John"
                                className={errors.firstName ? "border-red-500" : ""}
                            />
                            {errors.firstName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium">Last Name</label>
                            <Input
                                {...register("lastName")}
                                placeholder="Doe"
                                className={errors.lastName ? "border-red-500" : ""}
                            />
                            {errors.lastName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="john.doe@example.com"
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Phone</label>
                        <Input
                            {...register("phone")}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Bio</label>
                        <textarea
                            {...register("bio")}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us a bit about yourself..."
                        />
                        {errors.bio && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.bio.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}