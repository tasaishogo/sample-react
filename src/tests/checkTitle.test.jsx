import { LearningLog } from "../LearningLog";
import React from "react";
import { expect, test } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

test("Check the title of the page", () => {
    render(<LearningLog />);
    const target = screen.getByText('学習記録');
    expect(target).toBeInTheDocument();
})

test("Added a new record and remove the record", async () => {
    render(<LearningLog />);
    const titleInput = screen.getByPlaceholderText('学習項目の概要を入力してください');
    const timeInput = screen.getByPlaceholderText('学習時間を入力してください');
    const addButton = screen.getByText('登録');
    // 事前にli要素の数を数えておく
    let liCount = await waitFor(() => screen.getAllByRole('listitem').length);
    fireEvent.change(titleInput, { target: { value: 'Remixの学習' } });
    fireEvent.change(timeInput, { target: { value: 60 } });
    fireEvent.click(addButton);
    // レコードが追加されたか確認
    await waitFor(() => {
        expect(screen.getAllByRole('listitem').length).toBe(liCount + 1);
    });
    // 追加したレコードを削除
    const deleteButton = screen.getAllByText('削除').pop();
    fireEvent.click(deleteButton);
    // レコードが削除されたか確認
    await waitFor(() => {
        expect(screen.getAllByRole('listitem').length).toBe(liCount);
    });
})

test("Check the error message when the title is empty", async () => {
    render(<LearningLog />);
    const titleInput = screen.getByPlaceholderText('学習項目の概要を入力してください');
    const timeInput = screen.getByPlaceholderText('学習時間を入力してください');
    const addButton = screen.getByText('登録');
    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.change(timeInput, { target: { value: 60 } });
    fireEvent.click(addButton);
    const errorMessage = await screen.findByText('学習項目を入力してください');
    expect(errorMessage).toBeInTheDocument();
})

test("Check the error message when the time is empty", async () => {
    render(<LearningLog />);
    const titleInput = screen.getByPlaceholderText('学習項目の概要を入力してください');
    const timeInput = screen.getByPlaceholderText('学習時間を入力してください');
    const addButton = screen.getByText('登録');
    fireEvent.change(titleInput, { target: { value: 'Vitestの学習' } });
    fireEvent.change(timeInput, { target: { value: '' } });
    fireEvent.click(addButton);
    const errorMessage = await screen.findByText('学習時間を入力してください');
    expect(errorMessage).toBeInTheDocument();
})