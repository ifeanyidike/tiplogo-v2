import mongoose from 'mongoose'
import User from './userModels.js'

const OLevelResultUploadSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    orderItems: {
      type: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      profileCode: {
        type: String,
        required: true,
      },
      schoolAttended: {
        type: String,
        required: true,
      },
      schoolType: {
        type: String,
        required: true,
      },
      subjectUpload: [
        {
          subject: {
            type: String,
          },
          grade: {
            type: String,
          },
          examNumber: {
            type: String,
          },
          examType: {
            type: String,
          },
          examYear: {
            type: String,
          },
        },
      ],
      files: [
        {
          cloudinary_id: {
            type: String,
          },
          image: {
            type: String,
            required: true,
          },
        },
      ],
    },
    admin_upload: {
      cloudinary_id: {
        type: String,
      },
      image: {
        type: String,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      updated_time: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

const OLevelResultUploadOrder = mongoose.model(
  'OLevelResultUploadOrder',
  OLevelResultUploadSchema,
)

export default OLevelResultUploadOrder
