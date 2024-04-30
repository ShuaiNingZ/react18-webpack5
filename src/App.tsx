import React, { useState, lazy, Suspense } from 'react';
import Class from '@/components/Class';
import smallImg from '@/assets/imgs/small.svg';
import bigImg from '@/assets/imgs/big.jpg';

const LazyDemo = lazy(() => import('@/components/LazyDemo'));

function App() {
    const [show, setShow] = useState(false);

    const onClick = () => {
        import('./App.scss');
        setShow(true);
    };

    return (
        <h2>
            webpack-react-ts
            <Class />
            <div onClick={onClick}>展示</div>
            <img src={smallImg} alt="" />
            {
                // show 为 true 时加载 LazyDemo 组件
            }
            {show && (
                <Suspense fallback={null}>
                    <LazyDemo />
                </Suspense>
            )}
        </h2>
    );
}

export default App;
