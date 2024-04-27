import ScrollUp from './ScrollUp'

const Layout = ({children}) => {
    return (
        <div>
            {children}
            <ScrollUp />
        </div>
    )
}

export default Layout
