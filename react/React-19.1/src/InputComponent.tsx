import type { Dispatch, SetStateAction } from "react"


const InputComponent = (
    { 
        placeholder, 
        text, 
        setInputText 
    }: { 
        placeholder: string, 
        text: string, 
        setInputText: Dispatch<SetStateAction<string>>
    }) => {
    return (
        <div className="mt-4">
            <label htmlFor="inputComponent">Label </label>
            <input 
                id="inputComponent" 
                placeholder={placeholder} 
                value={text}
                onInput={e => setInputText((e.target as HTMLInputElement).value)}
            />
        </div>
    )
}

export default InputComponent