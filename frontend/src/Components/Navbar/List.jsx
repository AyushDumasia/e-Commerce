import {NavLink} from 'react-router-dom'

function List({goto, content}) {
    return (
        <li>
            <NavLink
                to={goto}
                className={({isActive}) =>
                    `${isActive ? 'text-[blue] border-b-2 border-[blue] pb-2 ' : 'text-black'}`
                }
            >
                {content}
            </NavLink>
        </li>
    )
}

export default List
