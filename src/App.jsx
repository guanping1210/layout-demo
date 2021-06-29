import './App.css';
import 'antd/dist/antd.min.css'
import TreeMenu from './components/Tree'
import Transfer from './components/Transfer'
import UploadList from './components/Upload'
import PicturesWall from './components/LogoUpload'
import CustomProgress from './components/Progress'
import LayoutGrid from './components/LayoutGrid'


function App() {
  return (
    <div className="App">
      {/* <PicturesWall />
      <UploadList />
      <Transfer />
      <TreeMenu />
      <CustomProgress /> */}
      <LayoutGrid />
    </div>
  );
}

export default App;



