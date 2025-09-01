'use client';
import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, Bot, Loader2, Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { analyzeSymptomsAction, getPersonalizedAdviceAction } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: React.ReactNode;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'symptoms' | 'advice'>('symptoms');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm MediAssist AI. How can I help you today? Select a mode above to get started.",
      },
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response;
      if (chatMode === 'symptoms') {
        response = await analyzeSymptomsAction(input);
        const assistantMessage: Message = {
            id: Date.now().toString() + '-ai',
            role: 'assistant',
            content: (
                <div className="space-y-4">
                    {response.possibleCauses && <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">Possible Causes</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm">
                            <p>{response.possibleCauses}</p>
                        </CardContent>
                    </Card>}
                    {response.suggestedNextSteps && <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">Suggested Next Steps</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm">
                            <p>{response.suggestedNextSteps}</p>
                        </CardContent>
                    </Card>}
                    {response.highPriorityConcerns && <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>High-Priority Concern</AlertTitle>
                        <AlertDescription>
                            Your symptoms may indicate a high-priority health concern. Please consider seeking medical attention promptly.
                        </AlertDescription>
                    </Alert>}
                     {response.referralResources && <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">Resources</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm">
                            <p>{response.referralResources}</p>
                        </CardContent>
                    </Card>}
                </div>
            )
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        response = await getPersonalizedAdviceAction(input);
        const assistantMessage: Message = {
            id: Date.now().toString() + '-ai',
            role: 'assistant',
            content: (
                 <div className="space-y-4">
                    {response.advice && <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">Personalized Advice</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm">
                            <p>{response.advice}</p>
                        </CardContent>
                    </Card>}
                    {response.preventiveMeasures && <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">Preventive Measures</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm">
                            <p>{response.preventiveMeasures}</p>
                        </CardContent>
                    </Card>}
                </div>
            )
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + '-err',
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <Tabs value={chatMode} onValueChange={(v) => setChatMode(v as 'symptoms' | 'advice')} className="mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="symptoms">Symptom Checker</TabsTrigger>
          <TabsTrigger value="advice">Personalized Advice</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex-1 overflow-y-auto pr-4 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={cn('flex items-start gap-4', message.role === 'user' ? 'justify-end' : 'justify-start')}>
            {message.role === 'assistant' && (
              <Avatar className="w-8 h-8 border">
                <AvatarFallback><Bot/></AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                'max-w-[75%] rounded-lg p-3 text-sm',
                message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              )}
            >
              {message.content}
            </div>
            {message.role === 'user' && (
              <Avatar className="w-8 h-8 border">
                 <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                 <AvatarFallback><User /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-4 justify-start">
              <Avatar className="w-8 h-8 border">
                <AvatarFallback><Bot/></AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                 <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-auto pt-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
                chatMode === 'symptoms' 
                ? 'e.g., "I have a headache and a slight fever."'
                : 'e.g., "What are some healthy lunch ideas?"'
            }
            className="flex-1"
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
