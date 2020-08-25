import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { api } from '../../services/services'
import Habit from '../../Components/Habit'
import DailyPointsGoalModal from '../../Components/DailyPointsGoalModal'
import DailyPointsCounter from '../../Components/DailyPointsCounter'


export default function Dashboard() {

  const [ habits, setHabits ] = useState('')
  const [ dailyPointsGoal, setDailyPointsGoal ] = useState('')
  const [ needsReload, setNeedsReload] = useState(false)
  const [ dailyPointsGoalmodal, setDailyPointsGoalModal ] = useState(false);

  const toggleModal = () => setDailyPointsGoalModal(!dailyPointsGoalmodal);


  const fetchUserHabits = async () => {
    const user_id = localStorage.getItem('user')
    const data = await api.get('/dashboard', {headers: {user_id }})
    return data
  }


  const getDailyPointsGoal = async () => {
    const user_id = localStorage.getItem('user')
    const data = await api.get(`/user/${user_id}/goal/`)
    return data
  }


  const updateReload = () => {
    setNeedsReload(true)
    setNeedsReload(false)
  }

  useEffect(() => {
    fetchUserHabits().then(response => {
      const habits = response.data
      setHabits(habits)
    })
    getDailyPointsGoal().then(response => {
      const goal = response.data.goal
      setDailyPointsGoal(goal)
    })
  }, [needsReload]);

  const isDailyPointsGoalModal = dailyPointsGoalmodal ? <DailyPointsGoalModal 
                                                          toggle={toggleModal}
                                                          modal={dailyPointsGoalmodal}
                                                          reload={updateReload}
                                                          /> : ''


  return(
    <Container>
      <div className="links">
        <Link to="/habits">Create a New Habit!</Link>
        <Link to="/dashboard/positive">Positive Habits</Link>
        <Link to="/dashboard/negative">Negative Habits</Link>
      </div>
      <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
        <DailyPointsCounter/>
     </div>
     <div>
       <button className='submit-btn' onClick={toggleModal}>modal</button>
       { isDailyPointsGoalModal }
       <h2>Daily Points Goal: {dailyPointsGoal}</h2>
     </div>
     <div className="habit-field">
       {habits && habits.map((habit) => {
          return (
            
            
              <Link  to={{pathname: `habit/${habit.id}`}}
                     className="habit-clickable"> 
                <Habit  key={habit.id} 
                        habit={habit}
                        id={habit.id}
                        title={habit.title}
                        description={habit.description}
                        points={habit.points}
                        habitType={habit.habitType}
                        reloadHabits={updateReload}
                        />
              </Link> 
          )
        })}
       </div>
        
    </Container>
  )
}
