import React from 'react'
import AddPost from '../Add Post/AddPost'
import ProCommon from './ProCommon'

const ProAddPost = () => {
    return (
        <>
            <div className="profile_container">
                <ProCommon />
            </div>
            <AddPost/>
        </>
    )
}

export default ProAddPost