"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import api from "../services/api"

interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  imageUrl: string;
  currentAmount: number;
  goalAmount: number;
  backers: number;
  endDate: string;
}

interface RelatedProjectsProps {
  category: string;
  currentProjectId: string;
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({ category, currentProjectId }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchRelatedProjects = async (): Promise<void> => {
      try {
        const response = await api.get<Project[]>(`/projects/related?category=${category}&exclude=${currentProjectId}`)
        setProjects(response.data)
      } catch (error) {
        console.error("Error fetching related projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProjects()
  }, [category, currentProjectId])

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Related Projects</h2>
        <div className="flex space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="w-[300px] flex-shrink-0 animate-pulse">
              <div className="h-40 bg-muted rounded-t-lg"></div>
              <CardHeader className="pb-2">
                <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-muted rounded w-full mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Related Projects</h2>
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {projects.map((project) => (
            <Card key={project._id} className="w-[300px] flex-shrink-0">
              <Link to={`/projects/${project._id}`} className="block h-40 overflow-hidden">
                <img
                  src={project.imageUrl || "/placeholder.svg?height=160&width=300"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </Link>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{project.category}</Badge>
                </div>
                <CardTitle className="text-base line-clamp-1">
                  <Link to={`/projects/${project._id}`} className="hover:text-primary transition-colors">
                    {project.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">{project.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <Progress
                  value={Math.min(Math.round((project.currentAmount / project.goalAmount) * 100), 100)}
                  className="h-1 mb-2"
                />
                <div className="flex justify-between text-xs">
                  <span className="font-medium">${project.currentAmount.toLocaleString()}</span>
                  <span className="text-muted-foreground">
                    {Math.round((project.currentAmount / project.goalAmount) * 100)}%
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 text-xs text-muted-foreground">
                <div className="w-full flex justify-between">
                  <span>{project.backers} backers</span>
                  <span>
                    {Math.max(0, Math.ceil((new Date(project.endDate) - new Date()) / (1000 * 60 * 60 * 24)))} days left
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default RelatedProjects 