import {NavLink} from 'react-router-dom'

function List({goto, content}) {
    return (
        <li>
            <NavLink
                to={goto}
                className={({isActive}) =>
                    `${isActive ? 'text-[blue]' : 'text-black'}`
                }
            >
                {content}
            </NavLink>
        </li>
    )
}

export default List
