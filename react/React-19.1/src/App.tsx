import { useState } from "react"
import ComponentWithProps from './ComponentWithProps'
const list = [1,2,3]
const title = 'Заголовок пропса'

/** Функция Alert переданная в props */
const func = () => alert('call Func')

function App() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('Текст пропса')
    const [isShow, setIsShow] = useState(false)


    const renderList = list.map(item => 
        <li key={item}>{item}</li>
    )
    return (
        <>
            <div>Какой-то текст</div>
            <div>
                <ul>
                    {renderList}
                </ul>
            </div>
            <div>
                <button onClick={() => setCount((count) => count++)}>
                    {count}
                </button>
            </div>

            <div className="mt-3">
                <button onClick={() => setIsShow(prevValue => !prevValue)}>{isShow ? 'Скрыть' : 'Отображать'} ComponentWithProps</button>
                {isShow && <ComponentWithProps
                    title={title}
                    text={text}
                    func={func}
                />}
            </div>
            

        </>
    )
}

export default App