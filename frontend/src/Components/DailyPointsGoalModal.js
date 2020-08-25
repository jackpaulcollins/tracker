import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { api } from '../services/services';

const DailyPointsGoalModal = (props) => {
  const {
    buttonLabel,
    className,
    toggle,
    modal,
    reload
  } = props;

  const [ dailyPoints, setDailyPoints ] = useState(null)

  const updateDailyPointsGoal = async (goal) => {
    console.log(goal)
    const user_id = localStorage.getItem('user')
    await api.put(`/user/update_goal/${user_id}/${goal}/`)
    toggle()
    alert(`Updated Your Daily Points Goal to ${goal}`)
    reload()
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Set Your Daily Points Goal!</ModalHeader>
        <ModalBody>
          <input onChange={e => setDailyPoints(e.target.value)}>
          </input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => updateDailyPointsGoal(dailyPoints)}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DailyPointsGoalModal;