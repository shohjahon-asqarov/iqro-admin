import { Input, Modal, Radio, Select } from 'antd'
import React, { useState } from 'react'

import { UserOutlined, TagsOutlined } from '@ant-design/icons'
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const AddTest = () => {
    const [status, setStatus] = useState(false)
    const [category, setCategory] = useState('')
    const [editQuestion, setEditQuestion] = useState('')
    const [editIndex, setEditIndex] = useState(null)

    const [correct, setCorrect] = useState(0)

    const [loading, setLoading] = useState(false)

    const [questions, setQuestions] = useState([])

    const [options, setOptions] = useState({})

    const [complated, setComplated] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const addTest = async (e) => {
        e.preventDefault()


        setOptions({
            name: e.target[0].value,
            theme: e.target[1].value,
            category: category,
            added_time: new Date().toLocaleDateString()
        })
        setStatus(true)
    }

    const addQuestion = async (e) => {
        e.preventDefault()
        if (correct !== 0) {
            const question = {
                question: e.target[0].value,
                answers: [e.target[2].value, e.target[4].value, e.target[6].value, e.target[8].value],
                correct_answer: correct
            }
            if (questions.length === 9) {
                setQuestions(questions => [...questions, question])
                setCorrect(0)
                e.target.reset()
                setComplated(true)
            } else {
                setQuestions(questions => [...questions, question])
                setCorrect(0)
                e.target.reset()
            }


        } else {

            toast.warn(`To'g'ri javobni belgilang!`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const uploadQuestion = async () => {
        setComplated(true)
        setLoading(true)
        await addDoc(collection(db, 'questions'), {
            owner: options,
            questions: questions
        });
        setQuestions(questions => [])
        setStatus(false)
        setCorrect(0)
        setComplated(false)
        setLoading(false)

        toast.success(`Muvaffaqiyatli qo'shildi!`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const changeAnswer = (change_index, correct_index) => {
        setQuestions(questions.map((q, index) => {
            if (change_index === index) {
                return { ...q, correct_answer: correct_index }
            } else {
                return q
            }
        }))
    }

    const showModal = (question, index) => {
        setIsModalOpen(true);
        setEditQuestion(question)
        setEditIndex(index)
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setQuestions(questions.map((q, index) => {
            if (editIndex === index) {
                return { ...q, question: editQuestion }
            } else {
                return q
            }
        }))
        setEditIndex(null)
        setEditQuestion('')
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditIndex(null)
        setEditQuestion('')
    };

    return (
        <section className='container pt-10 flex justify-center space-x-10'>

            {!complated ?
                <div className='w-full'>
                    {
                        !status ?
                            <form onSubmit={(e) => addTest(e)} className='forma w-full p-5 py-12 sm:px-8 rounded-3xl bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-6 text-[rgba(2,11,18,.7)]'>
                                <h3 className='text-lg sm:text-xl font-semibold border-b pb-4 w-full animation-show'>Test tuzish</h3>

                                <Input className='py-2.5 input' size='large' prefix={<UserOutlined />} placeholder='Ismingiz' />
                                <Input className='py-2.5 input' size='large' prefix={<TagsOutlined />} placeholder='Test mavzusi' />
                                <Select className='w-full' onChange={(e) => setCategory(e)}
                                    defaultValue="Categoriyani tanlang"
                                    size='large'
                                    options={[
                                        {
                                            value: 'All',
                                            label: 'Barchasi',
                                        },
                                        {
                                            value: 'English',
                                            label: 'English',
                                        },
                                        {
                                            value: 'Fizika',
                                            label: 'Fizika',
                                        },
                                        {
                                            value: 'Ona-tili',
                                            label: 'Ona-tili',
                                        },
                                        {
                                            value: 'Rus-tili',
                                            label: 'Rus-tili',
                                        }
                                    ]}
                                />
                                <div className="flex justify-end">
                                    <button className='btn-blue'>Keyingi</button>
                                </div>
                            </form>
                            : <form onSubmit={(e) => addQuestion(e)} className='w-full p-5 py-6 sm:px-8 rounded-3xl bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-5 text-[rgba(2,11,18,.7)]'>
                                <div className='mt-5 font-bold flex justify-between'>
                                    <span>Savol</span>
                                    <span>{questions.length + 1}/10</span>
                                </div>
                                {/* <TextArea ref={questionRef} placeholder='Savolni kiriting' showCount maxLength={100} /> */}
                                <textarea className='border block w-full rounded-md outline-none p-5' placeholder='Savolni kiriting'></textarea>
                                <span className='mt-5 inline-block font-bold'>Javoblar</span>
                                <ul className='space-y-3'>
                                    <li className={`answers-list ${correct === 1 && 'correct-answer'}`}>
                                        <Radio onClick={() => setCorrect(1)} checked={correct === 1} />
                                        <span>A)</span>
                                        <input className='outline-none w-full pl-2' type="text" />
                                    </li>
                                    <li className={`answers-list ${correct === 2 && 'correct-answer'}`}>
                                        <Radio onClick={() => setCorrect(2)} checked={correct === 2} />
                                        <span>B)</span>
                                        <input className='outline-none w-full pl-2' type="text" />
                                    </li>
                                    <li className={`answers-list ${correct === 3 && 'correct-answer'}`}>
                                        <Radio onClick={() => setCorrect(3)} checked={correct === 3} />
                                        <span>C)</span>
                                        <input className='outline-none w-full pl-2' type="text" />
                                    </li>
                                    <li className={`answers-list ${correct === 4 && 'correct-answer'}`}>
                                        <Radio onClick={() => setCorrect(4)} checked={correct === 4} />
                                        <span>D)</span>
                                        <input className='outline-none w-full pl-2' type="text" />
                                    </li>
                                </ul>

                                <div className="flex justify-end pt-3">
                                    <button className='btn-blue'>
                                        <span className='mr-2'>{questions.length === 9 ? `Savollarni tekshirish` : 'Keyingi'}</span>
                                    </button>
                                </div>
                            </form>
                    }
                </div>
                : <ul className='w-full space-y-5 py-20'>
                    {
                        questions.map((question, index) => {
                            return (
                                <li className='p-5 py-12 sm:px-8 rounded-3xl bg-card-bg border border-[hsla(0,0%,87.5%,.7)] space-y-5 text-[rgba(2,11,18,.7)] relative overflow-hidden' key={index}>
                                    <div className='flex justify-between items-center'>
                                        <h3 className='text-lg sm:text-xl font-semibold border-b pb-4 w-full animation-show'>{index + 1} / 10) {question.question}</h3>
                                        <button onClick={() => showModal(question.question, index)} className='btn-blue py-2 px-3 -translate-y-3'>
                                            <i className='bi bi-pencil'></i>
                                        </button>
                                    </div>
                                    <div className='space-y-5 flex flex-col'>
                                        {question.answers.map((answer, i) => {
                                            return (
                                                <button onClick={() => changeAnswer(index, (i + 1))} className={`bg-white py-3.5 px-5 group ${question.correct_answer === (i + 1) ? 'bg-[#289C8E] border-[#289C8E]' : ''} rounded-xl cursor-pointer active:bg-[#289C8E] active:text-white text-left duration-300 flex justify-between border-2 hover:border-[#289C8E]`} key={index}>
                                                    <div>
                                                        <span className='font-medium'>
                                                            {i === 0 && 'A) '}
                                                            {i === 1 && 'B) '}
                                                            {i === 2 && 'C) '}
                                                            {i === 3 && 'D) '}
                                                        </span>
                                                        {answer}
                                                    </div>
                                                    <i className={`bi bi-check ${question.correct_answer === (i + 1) ? 'flex' : 'hidden'} bg-[#289C8E] rounded-full w-5 h-5 justify-center items-center text-white`}></i>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </li>
                            )
                        })
                    }
                    <li className='flex justify-end py-5'>
                        <button onClick={uploadQuestion} className='btn-blue'>
                            {!complated ? 'Saqlanmoqda' : 'Saqlash'}
                        </button>
                    </li>
                </ul>
            }

            <Modal title="Tahrirlash" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <textarea onChange={(e) => setEditQuestion(e.target.value)} value={editQuestion} className='border block w-full rounded-md outline-none p-2'></textarea>
            </Modal>

            {loading && <Loader />}
        </section >
    )
}

export default AddTest