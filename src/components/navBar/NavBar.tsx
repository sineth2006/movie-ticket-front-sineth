import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'//npm has install method for this
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { NavItem } from '../../models/NavItems'
import logo from '../libs/Logo-RM.png';


const openRoutes: NavItem[] = [
    { name: 'SignIn', path: "/sign-in", current: true },
    { name: 'SignUp', path: "/sign-up", current: false },
]
const secureRoutes = [
    { name: 'Movies', path: "/movies", current: false },
]
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export function NavBar() {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const handleOnLogOut = () => {
        logout()
        navigate("/sign-in")
    }
    return (
        <Disclosure
            as="nav"
            className="relative bg-[#000000] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">

                            <img alt="Logo" src={logo} className="h-11 w-auto" />

                        </div>
                        {isAuthenticated ?
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {secureRoutes.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.path}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>

                            :
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {openRoutes.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.path}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {isAuthenticated &&
                            <button
                                type="button"
                                className="relative rounded-full p-1 text-red-600 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                                onClick={handleOnLogOut}
                            >
                                Logout
                            </button>
                        }
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                {isAuthenticated ? 
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {secureRoutes.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as={NavLink}
                                to={item.path}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div> 
                    :
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {openRoutes.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as={NavLink}
                                to={item.path}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
            }
            </DisclosurePanel>
        </Disclosure>
    )
}