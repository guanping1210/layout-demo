const CustomProgress = () => {
  return <div>
    <h4>demo 进度条</h4>
    <div>
      <div className="custom-progress">
        <div className="custom-all"></div>
        <div className="custom-success"></div>
        <div className="arrow">
          <span>累计损伤</span>
          <span>|</span>
          <span>剩余寿命</span>
        </div>
      </div>
    </div>
  </div>
}

export default CustomProgress