const mongoose = require('mongoose');
const { connectDb } = require('./connection');
const Movie = require('./models/movie');
const ObjectId = mongoose.Types.ObjectId;

async function deleteDuplicateDescriptions() {
  try {
    const duplicates = await Movie.aggregate([
      {
        $group: {
          _id: "$description",
          ids: { $push: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 } // Only groups with more than 1 document
        }
      }
    ]);

    for (const group of duplicates) {
      // Keep the first document, delete the rest
      const idsToDelete = group.ids.slice(1);

      await Movie.deleteMany({ _id: { $in: idsToDelete } });
    }

    console.log('Duplicate descriptions deleted successfully');
  } catch (error) {
    console.error('Error deleting duplicates:', error);
  }
}


async function getDuplicateMovies() {
  try {
    
    // Step 1: Find duplicates based on tmdb_id
    const duplicates = await Movie.aggregate([
      {
        $group: {
          _id: "$tmdb_id",
          ids: { $push: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 } // Only groups with more than 1 document
        }
      }
    ]);

    // Step 2: Retrieve the actual movie documents using the IDs
    const duplicateMovies = [];
    for (const duplicate of duplicates) {
     try{
      const movies = await Movie.find({ _id: { $in: duplicate.ids} });
      duplicateMovies.push(...movies);
     }catch(error){
      console.log("error of find ", error)
     }
    
    }

    return duplicateMovies;
  } catch (error) {
    console.error('Error fetching duplicate movies:', error);
    throw error;
  } 
}

module.exports = { deleteDuplicateDescriptions ,getDuplicateMovies}
