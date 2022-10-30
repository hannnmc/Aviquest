import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as taskActions from '../../store/task';
import { Modal } from '../../context/Modal';
import './TaskListItem.css';
import TaskForm from '../TaskForm';

const TaskListItem = ({task, tasks}) => {

    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = useState(false);
    const [options, setOptions] = useState(false);
    const [checked, setChecked] = useState(task.isComplete);
    const [showModal, setShowModal] = useState(false);
    const [dmg, setDmg] = useState(5);

    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (!options) return;

        const closeMenu = () => {
            setOptions(false);
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [options]);

    useEffect(() => {
        if (checked) {
            // console.log(`do ${dmg} damage`);
            // console.table(currentUser);
            console.log(currentUser.quest[0].monster.imageUrl);
            // when checked, change update user iscomplete and monster hp
            const userData = {
                _id: currentUser._id,
            }

        }
    }, [checked]);

    const handleOptions = (e) => {
        // e.stopPropagation();
        e.preventDefault();
        setOptions(!options);
    }

    const handleShowTask = (e) => {
        e.preventDefault();
    }
    
    const handleEdit = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        setShowModal(true);
        setOptions(!options);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        // e.stopPropagation();
        const newTaskList = tasks.filter(taskItem => taskItem._id !== task._id);
        dispatch(taskActions.deleteTask(task._id, newTaskList))
    }

    const handleCheck = (e) => {
        setChecked(!checked);
        if (task.difficulty === 3 ) setDmg(15);
        if (task.difficulty === 2 ) setDmg(10);
        setChecked(!checked);
    }

    return ( 
        <div className='task-item-container'
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        // onClick={(e) => handleShowTask(e)}
        >        
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskForm task={task} tasks={tasks} setShowModal={setShowModal}/>
                </Modal>
            )}
            <div className='task-item-body'>
                <div className='task-item-body-start'>
                    <div className='task-item-check'>
                        <label>
                            <input type="checkbox"
                            className='task-checkbox'
                            onChange={(e) => handleCheck(e)}
                            />
                            <svg
                                className={`checkbox ${checked ? "checkbox--active" : ""}`}
                                aria-hidden="true"
                                viewBox="0 0 15 11"
                                fill="none"
                            > 
                                <path 
                                    d="M1 4.5L5 9L14 1"
                                    strokeWidth="2"
                                    stroke={checked ? "#fff" : "none"}
                                />
                            </svg>
                        </label>
                    </div>
                    <div className='task-item-title'>{task.title}</div>
                </div>
                {showOptions && <div className='task-item-options'
                onClick={(e) => handleOptions(e)}
                >⋮
                </div>}
                {options && 
                        <div className='task-options-dropdown'
                        >
                            <div className='task-options-edit'
                            onClick={(e) => handleEdit(e)}
                            >✎ &nbsp;  Edit</div>
                            <div className='task-options-delete'
                            onClick={(e) => handleDelete(e)}
                            >🗑 Delete</div>
                        </div>
                }
            </div>
        </div>
     );
}
 
export default TaskListItem;