import { Provider } from 'react-redux'

import store from 'state/store'
import Container from 'components/Container'
import Logo from 'components/Logo'
import Navigation from 'components/Navigation'
import QueueScreen from 'Queue/QueueScreen'
import logo from 'qudini-logo.png'
import Content from 'components/Content'

const App = () => (
  <Provider store={store}>
    <Container>
      <Navigation>
        <Logo src={logo} />
      </Navigation>
      <Content>
        <QueueScreen />
      </Content>
    </Container>
  </Provider>
)

export default App
