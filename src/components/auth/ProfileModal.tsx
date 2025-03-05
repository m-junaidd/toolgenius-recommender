
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, UserRoundCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const ProfileModal = ({ isOpen, onClose, className }: ProfileModalProps) => {
  const [profession, setProfession] = useState('');
  const [interests, setInterests] = useState('');
  const [bio, setBio] = useState('');
  const { toast } = useToast();
  const { user, updateProfile } = useAuth();

  useEffect(() => {
    if (user?.profession) setProfession(user.profession);
    if (user?.interests) setInterests(user.interests);
    if (user?.bio) setBio(user.bio);
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      profession,
      interests,
      bio
    });
    
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in">
      <div className={cn(
        "bg-white rounded-xl shadow-strong w-full max-w-md p-6 relative animate-in",
        className
      )}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <div className="mb-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserRoundCheck size={24} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Complete Your Profile
          </h2>
          <p className="text-muted-foreground">
            Tell us more about yourself to get better AI tool recommendations
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profession" className="block text-sm font-medium mb-1">
              Your Profession
            </label>
            <Input
              id="profession"
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="e.g. Graphic Designer, Developer, Marketing Manager"
              className="w-full"
              required
            />
          </div>
          
          <div>
            <label htmlFor="interests" className="block text-sm font-medium mb-1">
              AI Tools Interests
            </label>
            <Input
              id="interests"
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g. Coding, Content Creation, Design, Writing"
              className="w-full"
              required
            />
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1">
              Short Bio
            </label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a bit about yourself and how you use AI tools..."
              className="w-full min-h-[100px]"
            />
          </div>
          
          <Button type="submit" className="w-full btn-green">
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
