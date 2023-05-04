import {
    Input,
    Button,
    Page,
    Navigation,
    Footer 
} from './'
import { Link } from 'react-router-dom'

function StyledComponent() {
  const padding = {
    padding: '5px'
  }

  return (
    <Page>
      <h1>Styled Component</h1>

      <h2>Navigation Demo</h2>
      <Navigation>        
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </Navigation>

      <h2>Input Demo</h2>
      <Input/>
      <Input type='password' />

      <h2>Button Demo</h2>
      <Button type='submit' primary=''>Submit</Button>

      <h2>Footer Demo</h2>
      <Footer>       
        <em>Note app, Department of Computer Science 2022</em>
      </Footer>
    </Page>
  )
}

export default StyledComponent
