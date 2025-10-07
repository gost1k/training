import { useState } from "react"
import ComponentWithProps from './ComponentWithProps'
import InputComponent from './InputComponent'
const list = [1,2,3]
const title = 'Заголовок пропса'


function App() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('Текст пропса')
    const [isShow, setIsShow] = useState(false)
    const [inputText, setInputText] = useState('Содержимое инпута')

    const func = () => setText('новый текст')

    const renderList = list.map(item => 
        <li key={item}>{item}</li>
    )
    return (
        <>
        <div className="grid grid-cols-[1fr_1fr]">
            <div>
                <h2 className="text-2xl">Какой-то текст</h2>
                <div>
                    <ul>
                        {renderList}
                    </ul>
                </div>
                <div>
                    <button onClick={() => setCount(count => count + 1)}>
                        {count}
                    </button>
                </div>
                <div>
                    <InputComponent placeholder='Плейсхолдер' text={inputText} setInputText={setInputText}/>
                </div>
            </div>
            <div>
                <div className="mt-3">
                    <button onClick={() => setIsShow(prevValue => !prevValue)}>{isShow ? 'Скрыть' : 'Отображать'} ComponentWithProps</button>
                    {isShow && <ComponentWithProps
                        title={title}
                        text={text}
                        func={func}
                    />}
                </div>
            </div>
        </div>

        </>
    )
}

export default App