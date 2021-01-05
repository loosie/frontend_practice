// 페이지 공통부분 처리
import PropTypes from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head'

const App = ({ Component }) => {
    return (
        <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Nodebird</title>
        </Head>
        
        <Component />
        </>
    )
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default App;