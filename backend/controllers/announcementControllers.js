import asyncHandler from 'express-async-handler'
import Announcement from '../models/announcementModels.js'

// @desc    Fetch all announcements
// @route   GET /api/announcements/
// @access  Public

export const getAnnouncement = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find({})
  res.send(announcements)
})

// @desc    Create a announcement
// @route   POST /api/announcement
// @access  Private/Admin

export const updateAnnouncement = asyncHandler(async (req, res) => {
  const { announcement } = req.body
  try {
    const announcements = await Announcement.find({})
    if (announcements.length) {
      const updatedAnnouncement = await Announcement.findOneAndUpdate(
        { _id: announcements[0]._id },
        { info: announcement.info },
        { upsert: true, new: true },
      )
      res.status(200).send(updatedAnnouncement)
    } else {
      const newAnnouncement = new Announcement({
        info: announcement.info,
      })
      const savedAnnouncement = await newAnnouncement.save()
      res.status(201).send(savedAnnouncement)
    }
  } catch (error) {
    throw new Error(error.message)
  }
})
