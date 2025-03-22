export const getMediaFilesQuery = ({ page, pageSize, sort = "createdAt:DESC", search }) => {
    return {
      fields: ["name", "url", "width", "height", "alternativeText", "ext"],
      filters: {
        ...(search ? { name: { $contains: search } } : {}), // Search filter if provided
      },
      pagination: { page, pageSize },
      ...(sort ? { sort: Array.isArray(sort) ? sort : [sort] } : {}), // Ensure sort is always an array
    };
  };
  
  export const getSingleMediaFileQuery = () => {
    return {
      fields: ["name", "url", "width", "height", "alternativeText", "ext"],
    };
  };
  