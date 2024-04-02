import { Avatar, Dropdown, Navbar } from "flowbite-react"
import { useStudentAuth } from "../../hooks/student.auth"
import { useTeacherAuth } from "../../hooks/teacher.auth";

export default function NavItems() {

  const { student } = useStudentAuth();
  const { teacher } = useTeacherAuth();

  return (
    <div className="flex md:order-2">

      {(student || teacher) && 
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        
        <Dropdown.Header>
          <span className="block text-sm">{ student ? student.name : teacher?.name }</span>
          <span className="block truncate text-sm font-medium">{ student ? student.email : teacher?.email }</span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      }
      <Navbar.Toggle />
    </div>
  )
}
