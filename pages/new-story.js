import SecurePage from '../components/secure-page'
import StoryForm from '../components/story-form'

const NewStory = ({ session }) => <StoryForm session={session} />

export default SecurePage(NewStory)
