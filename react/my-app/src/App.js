import React, {useState} from 'react';
import Counter from "./components/Counter";
import ClassCounter from './components/ClassCounter';
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
        const [posts, setPosts] = useState([
            {id:1 , title: 'Javasript', text: 'Description'},
            {id:2 , title: 'Javasript 2', text: 'Description'},
            {id:3 , title: 'Javasript 3', text: 'Description'},

        ])

       return (
        <div className="App">
            {/*<Counter/>*/}
            {/*<ClassCounter/>*/}
            <form>
                <MyInput type="text" placeholder="Название поста"/>
                <MyInput type="text" placeholder="Описание поста"/>
                <MyButton disabled>Создать пост</MyButton>
            </form>
            <PostList posts={posts} title={'Список постов'}/>
        </div>
    );
}

export default App;
