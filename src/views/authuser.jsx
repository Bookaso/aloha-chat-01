import { defer } from "lodash-es";
import { useContext } from "react";
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../Context/usercontext'

const AuthUser = ({children, ...rest}) => {
    const [state, dispath] = useContext(UserContext);
    return(
        <Route 
            {...rest}
            render={()=>
            state.user.userId ? 
            children
            :
            <Redirect 
                to={{
                    pathname:"/signup",
                }}
            />
            }
        />
    )
}

export default AuthUser;