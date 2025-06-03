"use client"

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { Github } from "lucide-react"

const GithubLoginButton = () => {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => signIn("github", { callbackUrl: "/" })}
    >
      <Github className="mr-2 h-4 w-4" />
      Continue with GitHub
    </Button>
  )
}

export default GithubLoginButton