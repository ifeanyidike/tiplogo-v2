import mongoose from 'mongoose'

const announcementSchema = mongoose.Schema(
  {
    info: {
      type: String,
      required: true,
      default: 'Buy Jamb Result checkers, PINs and cards',
    },
  },
  {
    timestamps: true,
  },
)

const Announcement = mongoose.model('Announcement', announcementSchema)
export default Announcement
