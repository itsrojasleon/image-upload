import mongoose from 'mongoose';

interface PostAttrs {
  title: string;
  description: string;
  createdAt: Date;
  imageUrl: string;
  userId: string;
}

interface PostDoc extends mongoose.Document {
  title: string;
  description: string;
  createdAt: Date;
  imageUrl: string;
  userId: string;
}

interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
    required: true
  }
});

postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post };
