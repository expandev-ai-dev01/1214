-- =============================================
-- Stored Procedure: spHabitGet
-- Description: Retrieves a specific habit by ID
-- =============================================
CREATE OR ALTER PROCEDURE [functional].[spHabitGet]
    @idAccount INT,
    @idUser INT,
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Validation: Required fields
    IF @idAccount IS NULL OR @idAccount <= 0
    BEGIN
        THROW 51000, 'idAccountRequired', 1;
        RETURN;
    END

    IF @idUser IS NULL OR @idUser <= 0
    BEGIN
        THROW 51000, 'idUserRequired', 1;
        RETURN;
    END

    IF @id IS NULL OR @id <= 0
    BEGIN
        THROW 51000, 'O hábito selecionado não existe', 1;
        RETURN;
    END

    -- Retrieve habit
    SELECT
        [id],
        [idAccount],
        [idUser],
        [name],
        [description],
        [frequencyType],
        [weekDays],
        [monthDays],
        [scheduledTime],
        [estimatedMinutes],
        [startDate],
        [idCategory],
        [status],
        [dateCreated],
        [dateModified],
        [deleted]
    FROM [functional].[habit]
    WHERE
        [id] = @id
        AND [idAccount] = @idAccount
        AND [idUser] = @idUser
        AND [deleted] = 0;

    -- Check if habit exists
    IF @@ROWCOUNT = 0
    BEGIN
        THROW 51000, 'O hábito selecionado não existe', 1;
        RETURN;
    END
END
GO