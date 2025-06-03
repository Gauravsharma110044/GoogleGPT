import { Chat, User } from '@/types'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideBar from './sidebar/SideBar'

interface MobileSidebarProps {
  chats: Chat[];
  user: User;
}

const MobileSidebar = ({ chats, user }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-secondary pt-10 w-72">
        <SideBar chats={chats} user={user} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
