"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ImageIcon, Lock, Globe, Users, Upload, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function CreatePost() {
  const [visibility, setVisibility] = useState("public")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Post submitted:", { title, content, visibility, hasImage: !!imagePreview })
    // Handle post submission here
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header with gradient similar to profile cover */}
      <div className="h-24 w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-12 pb-12">
        {/* Back Button & Profile Info */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-card/90 hover:bg-card border border-border/50 shadow-lg backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 shadow-lg">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/avatar-3d.jpg" alt="Profile" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold leading-none">Alex Rivera</p>
              <p className="text-xs text-muted-foreground">@arivera.eth</p>
            </div>
          </div>
        </div>

        {/* Main Create Post Card */}
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="border-b border-border/50 bg-tertiary/5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-tertiary" />
                  Create New Post
                </CardTitle>
                <CardDescription className="mt-2">
                  Share your latest work, thoughts, or updates with your community
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-bold">
                  Post Title
                </Label>
                <Input
                  id="title"
                  placeholder="Give your post a catchy title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base h-11 bg-background/50"
                />
              </div>

              {/* Content Field */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-base font-bold">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="What's on your mind? Share your thoughts, ideas, or updates..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] text-base resize-y bg-background/50"
                />
                <p className="text-xs text-muted-foreground">
                  {content.length} characters • Supports markdown formatting
                </p>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-base font-bold">
                  Media Attachment
                </Label>
                <div className="flex flex-col gap-3">
                  {imagePreview ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-border/60 bg-muted">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2 rounded-full"
                        onClick={() => setImagePreview(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center aspect-video w-full rounded-lg border-2 border-dashed border-border/60 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground group-hover:text-tertiary transition-colors mb-2" />
                      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        Click to upload an image
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  )}
                  <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </div>
              </div>

              {/* Visibility & Post Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visibility" className="text-base font-bold">
                    Visibility
                  </Label>
                  <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger id="visibility" className="w-full bg-background/50">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary" />
                          <span>Public</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="supporters">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-secondary" />
                          <span>Supporters Only</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="collectors">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-tertiary" />
                          <span>Collectors Only</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-bold">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger id="category" className="w-full bg-background/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="artwork">Artwork</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="behind-scenes">Behind the Scenes</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Visibility Info Card */}
              {visibility !== "public" && (
                <Card className="bg-tertiary/5 border-tertiary/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-tertiary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground mb-1">
                          {visibility === "supporters" ? "Supporter Exclusive" : "Collector Exclusive"}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          This post will only be visible to your{" "}
                          {visibility === "supporters" ? "Supporter tier and above" : "Collector and Whale tier"}{" "}
                          members. Non-members will see a preview with a call-to-action to join.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-full border-border/60 bg-transparent hover:bg-muted/50"
                >
                  Save as Draft
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 rounded-full bg-secondary/90 hover:bg-secondary text-secondary-foreground"
                >
                  Schedule Post
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Publish Now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6 border-border/60 bg-card/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <ImageIcon className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground mb-2">Tips for engaging posts</p>
                <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                  <li>• Use high-quality images to showcase your work</li>
                  <li>• Keep your title concise and attention-grabbing</li>
                  <li>• Add value with behind-the-scenes content or insights</li>
                  <li>• Engage with comments to build community</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
