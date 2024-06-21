import catchAsync from '../../utils/catchAsync';
import { facultyServices } from './faculty.service';

const getAllFacultiesCont = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultyIntoDB();
  res.status(200).json({
    success: true,
    message: 'All faculty get successfully',
    data: result,
  });
});
const singleFacultyCont = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.getSingleFacultyInDB(id);
  res.status(200).json({
    success: true,
    message: 'Single faculty get successfully',
    data: result,
  });
});

const searchFacultyCont = catchAsync(async (req, res) => {
  const result = await facultyServices.getSearchFacultyInDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Single faculty get successfully',
    data: result,
  });
});

export const facultiesController = {
  getAllFacultiesCont,
  singleFacultyCont,
  searchFacultyCont,
};
