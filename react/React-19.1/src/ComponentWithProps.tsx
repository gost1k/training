function ComponentWithProps({ title, text, func }: {title: string, text: string, func: () => void}) {
    return (
        <>
            <h2>{title}</h2>
            <p>{text}</p>
            <button onClick={func}>Call Func</button>
        </>
    )
}

export default ComponentWithProps