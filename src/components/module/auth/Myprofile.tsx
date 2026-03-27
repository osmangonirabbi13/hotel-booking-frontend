"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Camera, User, Mail, Phone, MapPin, Upload, Loader2, CheckCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { getUserInfo, updateMyProfile } from "@/services/auth.service";

const MyProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 1. Fetch User Data
  const { data: user, isLoading: isProfileLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getUserInfo,
  });

  // 2. Sync Form Data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.contactNumber || user.phone || "",
        address: user.address || "",
      });
      // prevent empty string warning: use null if no photo
      setPreviewUrl(user.profilePhoto || null);
    }
  }, [user]);

  // 3. Cleanup Preview URL
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // 4. Update Mutation
  const updateProfileMutation = useMutation({
    mutationFn: (formData: FormData) => updateMyProfile(formData),
    onSuccess: (success) => {
      if (success) {
        toast.success("Profile updated successfully!");
        setProfilePhoto(null);
        queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      } else {
        toast.error("Failed to update profile.");
      }
    },
    onError: () => toast.error("Something went wrong!"),
  });

  // 5. Check if form is changed
  const isDirty = useMemo(() => {
    if (!user) return false;
    return (
      form.name !== (user.name || "") ||
      form.phone !== (user.contactNumber || user.phone || "") ||
      form.address !== (user.address || "") ||
      profilePhoto !== null
    );
  }, [form, user, profilePhoto]);

  // 6. Handle File Selection
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) return toast.error("Please select an image.");
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be under 5MB.");
    
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setProfilePhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // 7. Submit with Postman-style structure
  const handleSubmit = () => {
    const formData = new FormData();

    // Backend middleware er jonno JSON data
    const profileData = {
      name: form.name,
      contactNumber: form.phone, 
      address: form.address,
    };

    formData.append("data", JSON.stringify(profileData));
    
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    updateProfileMutation.mutate(formData);
  };

  if (isProfileLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>

        <Card className="rounded-2xl border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Profile Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 pt-8 bg-white">
            {/* Avatar & Upload Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-gray-100 shadow-sm">
                  {/* Fixed empty string warning: use undefined instead of "" */}
                  <AvatarImage 
                    src={previewUrl ? previewUrl : undefined} 
                    className="object-cover" 
                  />
                  <AvatarFallback className="bg-green-50 text-green-600 text-2xl font-bold">
                    {form.name ? form.name[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 rounded-full bg-green-600 p-2 text-white shadow-lg hover:bg-green-700 transition-all active:scale-90"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files[0]) handleFileChange(e.dataTransfer.files[0]);
                }}
                className={`flex-1 w-full cursor-pointer border-2 border-dashed py-8 rounded-2xl transition-all flex flex-col items-center justify-center gap-2 ${
                  isDragging ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-green-300"
                }`}
              >
                <Upload className="h-6 w-6 text-gray-400" />
                <p className="text-sm font-medium text-gray-600">
                  {profilePhoto ? (
                    <span className="text-green-600 flex items-center gap-1 font-semibold">
                      <CheckCircle size={16} /> {profilePhoto.name.slice(0, 15)}...
                    </span>
                  ) : "Click or drag to change photo"}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
              />
            </div>

            {/* Input Form */}
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="email" value={form.email} disabled className="pl-10 h-12 bg-gray-100 cursor-not-allowed rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSubmit}
                disabled={updateProfileMutation.isPending || !isDirty}
                className="h-12 px-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                {updateProfileMutation.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;