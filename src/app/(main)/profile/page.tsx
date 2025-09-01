'use client';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your information has been saved.",
    });
  };

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">Manage your personal and medical information.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here. This information helps us personalize your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select defaultValue="male">
                        <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="lifestyle">Lifestyle</Label>
                <Textarea id="lifestyle" placeholder="e.g., Active, Sedentary, Smoker..." defaultValue="Active, non-smoker, exercises 3 times a week." />
             </div>

             <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>Providing this information helps the AI give more accurate advice. It will be kept confidential.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="conditions">Chronic Conditions</Label>
                        <Textarea id="conditions" placeholder="e.g., Diabetes, Hypertension, Asthma" defaultValue="No known chronic illnesses." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="medications">Current Medications</Label>
                        <Textarea id="medications" placeholder="e.g., Lisinopril, Metformin, Albuterol" defaultValue="None." />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies</Label>
                        <Textarea id="allergies" placeholder="e.g., Penicillin, Peanuts" defaultValue="None."/>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
                <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
