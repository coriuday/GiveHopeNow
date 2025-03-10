"use client"

import { useState, useEffect, ReactElement } from "react"
import { Link } from "react-router-dom"
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area"
import { Button } from "../components/ui/button"
import { Palette, Music, Film, Book, Code, Lightbulb, Utensils, Gamepad2, Heart } from "lucide-react"
import { getCategoryCounts, CategoryCount } from "../services/projectService"

interface Category {
  id: string;
  name: string;
  icon: ReactElement;
}

const categories: Category[] = [
  { id: "art", name: "Art", icon: <Palette size={20} /> },
  { id: "music", name: "Music", icon: <Music size={20} /> },
  { id: "film", name: "Film & Video", icon: <Film size={20} /> },
  { id: "publishing", name: "Publishing", icon: <Book size={20} /> },
  { id: "technology", name: "Technology", icon: <Code size={20} /> },
  { id: "design", name: "Design", icon: <Lightbulb size={20} /> },
  { id: "food", name: "Food", icon: <Utensils size={20} /> },
  { id: "games", name: "Games", icon: <Gamepad2 size={20} /> },
  { id: "community", name: "Community", icon: <Heart size={20} /> },
]

const CategoryList: React.FC = () => {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount>({})
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCategoryCounts = async (): Promise<void> => {
      try {
        const counts = await getCategoryCounts()
        setCategoryCounts(counts)
      } catch (error) {
        console.error("Error fetching category counts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryCounts()
  }, [])

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Explore Categories</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/projects?category=${category.id}`} className="flex-shrink-0">
              <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2 w-32">
                <div className="text-primary">{category.icon}</div>
                <span>{category.name}</span>
                {!loading && (
                  <span className="text-xs text-muted-foreground">{categoryCounts[category.id] || 0} projects</span>
                )}
              </Button>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default CategoryList 