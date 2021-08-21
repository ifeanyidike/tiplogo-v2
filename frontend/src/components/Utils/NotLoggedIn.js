import React from 'react'
import {useSelector} from "react-redux"
import {Modal} from "../../styles/ModalStyle"
import {Link} from "react-router-dom"
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const NotLoggedIn = () => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    return (
        <>                    
          {
                !userInfo && (
                    <Modal>
                        <div className="modalitem">
                            <p>You are not signed in</p>
                            <div>
                                <Link to="/auth">Login <VpnKeyIcon /></Link>    
                                <span>to continue</span>
                            </div>                    
                        </div>
                    </Modal>
                )
            }  
        </>
    )
}

export default NotLoggedIn
