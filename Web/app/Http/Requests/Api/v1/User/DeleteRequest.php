<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\v1\User;

use App\Enums\UserRole;
use App\Http\Shared\MakeApiResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DeleteRequest extends FormRequest
{
    use MakeApiResponse;

    public function authorize(): bool
    {
        return $this
            ->user('sanctum')
            ->hasRole(UserRole::ADMIN->value);
    }

    public function rules(): array
    {
        return [];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->errorResponse($validator->errors()->toArray(), 403)
        );
    }
    //Send 403 Failed Authorization

    protected function failedAuthorization()
    {
        throw new HttpResponseException(
            $this->errorResponse(['message' => 'You are not authorized to perform this action.'], 403)
        );
    }
}
