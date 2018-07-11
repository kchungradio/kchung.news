import SecurePage from '../components/hoc/secure-page'
import StoryForm from '../components/forms/story-form'

const NewStory = ({ session }) => <StoryForm session={session} />

export default SecurePage(NewStory)
