
import React from 'react';
import { Card, Col, Divider, Row } from 'antd';
const { Meta } = Card;

const Home = () => (


<>

    <div className=' row pt-5'>

  <Card
    hoverable
    style={{
        width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  <Card
    hoverable
    style={{
        width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>

        </div>
        </>
);
export default Home;