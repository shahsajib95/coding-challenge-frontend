
//  Error Handling
 export const Valid = ({ userId, title, body }) => {
    const errors = [];
    if (!userId) {
      errors.push("Please select a user.");
    }

    if (!title) {
      errors.push("Please add your title");
    }

    if (!body) {
      errors.push("Please add body");
    }

    return {
      errMsg: errors,
      errLength: errors.length,
    };
  };
