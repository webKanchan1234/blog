import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, updatePassword } from '../../action/userAction';
import { toast } from "react-toastify"
import Loader from "../Loader/Loader"
import "./profile.css"

const Profile = () => {
  const dispatch = useDispatch()
  const { loading, isUpdated, error } = useSelector((state) => state.profile)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const formData = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    dispatch(updatePassword(formData))
    // navigate("/admin/dashboard")
  }

  useEffect(() => {
    if (isUpdated) {
      toast.success("Password updated successfully")
      setShow(false)
    }
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [isUpdated, error, dispatch])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Button variant="primary" onClick={handleShow}>
            Change Password
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" onSubmit={handleSubmit}>
                <div className="username">
                  <LockIcon className="avatar" />
                  <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="username">
                  <LockIcon className="avatar" />
                  <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="password">
                  <LockIcon className="password" />
                  <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <input type="submit" value="Change Password" className="btn_submit" /> <br />

              </form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>
      )}
      <div className="profile_home">
        profile
      </div>
    </Fragment>
  )
}

export default Profile