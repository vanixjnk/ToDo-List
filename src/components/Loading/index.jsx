import { Spin } from "antd";

const Loading = ({status}) => {
    return ( 
        <Spin spinning={status}></Spin>
     );
}
 
export default Loading;