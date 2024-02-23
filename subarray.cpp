#include <iostream>
using namespace std;

int findSubarray(int arr[], int n)
{
    int max = 0;
    int sum = 0;
    for (int i = 0; i < n; i++)
    {
        sum = 0;
        for (int j = i; j < n; j++)
        {
            sum += arr[j];
            if (sum > max)
            {
                max = sum;
            }
        }
    }
    return max;
}

int main()
{
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8};
    int size = sizeof(arr) / sizeof(arr[0]);
    cout << findSubarray(arr, size);
    return 0;
}
