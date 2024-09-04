import catchAsync from '../../utils/catchAsync';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemCont = catchAsync(async (req, res) => {
  const result = await academicSemesterService.createAcademicSemesterInDB(
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Academic semester create successful',
    data: result,
  });
});

const getAllAcademicSemCont = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getAllAcademicSemesterFormDB(req.query);
  res.status(200).json({
    success: true,
    message: 'All Academic semester get successful',
    data: result,
  });

})

export const AcademicSemesterController = {
  createAcademicSemCont,
  getAllAcademicSemCont
};
