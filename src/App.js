import { Component } from 'react';
import './App.css';
import { PostCard } from './components/PostCard';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const connectPost = fetch('https://jsonplaceholder.typicode.com/posts');
    const connectImg = fetch('https://jsonplaceholder.typicode.com/photos');
    const [posts, photos] = await Promise.all([connectPost, connectImg]);
    const postsJson = await posts.json();
    const imgJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: imgJson[index].url }
    });
    this.setState({ posts: postsAndPhotos });
  }

  render() {
    const { posts } = this.state;
    return (
      <section className='container'>
        <div className="App">
          {posts.map(post => (

            <PostCard
              props={post} 
              />
          ))}
        </div>
      </section>
    );
  }
}



export default App;
