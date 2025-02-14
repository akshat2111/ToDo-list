"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Sparkles } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

const motivationalMessages = [
  "You're crushing it! 💪",
  "One step closer to your goals! 🎯",
  "You're on fire! 🔥",
  "Keep up the great work! 👏",
  "You're making magic happen! ✨",
]

const appreciativeMessages = [
  "Awesome job! 🌟",
  "You're a task-slaying superhero! 🦸‍♂️",
  "High five! ✋",
  "You're unstoppable! 🚀",
  "Task vanquished! 💥",
]

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [message, setMessage] = useState("")

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
      showMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)])
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    if (!todos.find((todo) => todo.id === id)?.completed) {
      showMessage(appreciativeMessages[Math.floor(Math.random() * appreciativeMessages.length)])
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    showMessage(appreciativeMessages[Math.floor(Math.random() * appreciativeMessages.length)])
  }

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center text-white">To-Do List</h1>
        <div className="bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-6">
          <form onSubmit={addTodo} className="flex flex-col sm:flex-row mb-4 gap-2">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow bg-white/30 text-white placeholder-white/70"
            />
            <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 w-full sm:w-auto">
              Add Task
            </Button>
          </form>
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4 p-2 bg-white/30 rounded text-white text-center font-bold"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
          <ul className="space-y-2">
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.li
                  key={todo.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="flex items-center justify-between bg-white/30 p-3 rounded"
                >
                  <div className="flex items-center flex-grow mr-2">
                    <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} className="mr-2" />
                    <span className={`${todo.completed ? "line-through text-white/70" : "text-white"} break-all`}>
                      {todo.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-white hover:text-red-300 flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {todos.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white mt-4">
              <Sparkles className="inline-block mr-2" />
              Add some tasks and let's get productive!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

